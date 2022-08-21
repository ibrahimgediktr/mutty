import {Grid, Container, Select, Tabs, Textarea, Button} from '@mantine/core';
import {KeywordCatalogCard} from './keyword-catalog-card';
import {useEffect, useState} from "react";
import {CountryPicker, SelectItem} from "./country-picker";

import * as ga from '../utils/ga'

type Category = {
    key: string;
    isMuted?: boolean;
}

type TwitterMute = {
    keyword: string;
}

const KeywordCatalogList = () => {
    const [countries, setCountries] = useState([]);
    const [muteCategories, setMuteCategories] = useState([]);
    const [topics, setTopics] = useState<any[]>([]);
    const [myMutedKeywords, setMyMutedKeywords] = useState([]);
    const [muteKeywordCatalogs, setMuteKeywordCatalogs] = useState([]);
    const [isLogged, setLogged] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');

    const getCategories = () => {
        const loadedMutes = myMutedKeywords.filter((keyword: string) => keyword.indexOf('mutty:') > -1).map((keyword: string) => keyword.replace('mutty:', ''));

        return muteKeywordCatalogs.map((category: Category) => {
            category.isMuted = loadedMutes.includes(category.key);
            return category;
        })
    };

    const changeCountry = async (countryCode: string) => {
        if (!countryCode) return;

        const categories: [] = await fetch(`/mute-dictionaries/${countryCode.toLowerCase()}/categories.json`, {
            method: 'GET'
        }).then(res => res.json()).catch(err => {
            return [];
        })

        setMuteCategories(categories);
        setSelectedCountry(countryCode);

        ga.event({
            action: "CHANGE_COUNTRY",
            params: {
                country: countryCode
            }
        })

        // @ts-ignore
        setTopics([...new Map(categories.map(item => [item['topicKey'], item])).values()])
    }

    useEffect(() => {
        if (!window) return;
        setLogged(!!localStorage.getItem('TWITTER_USERNAME'))
        const fetchAllMuteList = async () => {
            // TODO (peacecwz): Implement with better way
            const [categories, countries, {muted_keywords}] = await Promise.all(
                [
                    fetch('/mute-dictionaries/worldwide/categories.json', {
                        method: 'GET'
                    }).then(res => res.json()).catch(_ => []),

                    fetch('/countries.json', {
                        method: 'GET'
                    }).then(res => res.json()).catch(_ => []),

                    isLogged ? fetch('/api/mutes', {
                        method: 'GET'
                    }).then(res => {
                        if (res.status === 401) {
                            localStorage.removeItem('TWITTER_USERNAME');
                            return [];
                        }
                        return res.json()
                    }).catch(_ => []) : []
                ]
            );

            setMuteCategories(categories);
            setCountries(countries);
            // @ts-ignore
            setTopics([...new Map(categories.map(item => [item['topicKey'], item])).values()])
            setMyMutedKeywords(muted_keywords?.map((mutedKeyword: TwitterMute) => mutedKeyword.keyword) || []);
        };
        fetchAllMuteList();
    }, [isLogged]);

    return (
        <div className={'min-h-full mb-24'}>
            <Container>
                <Grid>
                    <Grid.Col xs={6}>
                        <CountryPicker
                            onSelect={async (e: any) => await changeCountry(e)}
                            data={countries.map((c: any) => ({
                                label: c.name,
                                image: c.image,
                                value: c.code
                            }))}/>
                    </Grid.Col>
                    <Grid.Col xs={6}>
                        <Select
                            label="Categories"
                            placeholder="Choose..."
                            itemComponent={SelectItem}
                            data={topics.map((topic: any) => ({
                                label: topic.topic,
                                value: topic.topicKey
                            }))}
                            onChange={(topicKey) => {
                                setMuteKeywordCatalogs(muteCategories.filter((c: any) => c.topicKey === topicKey))
                                ga.event({
                                    action: "CHANGE_TOPIC",
                                    params: {
                                        country: selectedCountry,
                                        topic: topicKey
                                    }
                                })
                            }}
                            searchable
                            nothingFound="Empty"
                            filter={(value, item: { label: string; value: string; image: string; }) =>
                                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                                item.value.toLowerCase().includes(value.toLowerCase().trim())
                            }
                        />
                    </Grid.Col>
                </Grid>
            </Container>
            <Container my="md">
                <Grid>
                    {getCategories().map((m: any, index) => (
                        <Grid.Col key={`mute-keyword-catalog-${index}`} xs={4}>
                            <KeywordCatalogCard
                                image={`https://loremflickr.com/320/240/${m.topicKey}?random=${index}`}
                                title={m.name}
                                description={m.description}
                                topic={m.topic}
                                category={m}
                                isMuted={m.isMuted}
                                isLogged={isLogged}
                                country={selectedCountry}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

const CustomKeyword = () => {
    const [keywords, setKeywords] = useState([]);
    const [state, setState] = useState('');

    const handleOnChange = (e: any) => {
        if (e.target.value === '') {
            setKeywords([]);
        } else {
            setKeywords(e.target.value.split(',').filter((k: string) => k.trim() !== ''));
        }
    }

    const handleMute = async () => {
        setState('muting')
        await fetch('/api/mutes/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keywords
            })
        })
        setState('muted')
    }

    return (
        <Container className={'p-10 items-center justify-center'}>
            <Textarea
                onChange={handleOnChange}
                placeholder="Keywords (split with comma)"
                label={keywords.length === 0 ? `Keywords (split with comma)` : `${keywords.length} keywords`}
                radius="md"
            />
            <Button disabled={state !== ''} className={'bg-tw-100 mt-4'} onClick={handleMute} size="lg">
                {state === '' ? `Mute ${keywords.length} keywords` : `${state}`}
            </Button>
        </Container>
    )
}

export const KeywordManager = () => {
    return (
        <Tabs unstyled styles={(theme) => ({
            tab: {
                ...theme.fn.focusStyles(),
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                cursor: 'pointer',
                fontSize: theme.fontSizes.sm,
                display: 'flex',

                '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                },

                '&:not(:first-of-type)': {
                    borderLeft: 0,
                },

                '&:first-of-type': {
                    borderTopLeftRadius: theme.radius.md,
                    borderBottomLeftRadius: theme.radius.md,
                },

                '&:last-of-type': {
                    borderTopRightRadius: theme.radius.md,
                    borderBottomRightRadius: theme.radius.md,
                },

                '&[data-active]': {
                    backgroundColor: theme.colors.blue[7],
                    borderColor: theme.colors.blue[7],
                    color: theme.white,
                },
            },

            tabIcon: {
                marginRight: theme.spacing.xs,
                display: 'flex',
                alignItems: 'center',
            },

            tabsList: {
                display: 'flex',
            },
        })} defaultValue={'custom'}>
            <Tabs.List className={'justify-center p-4'} position={'center'}>
                <Tabs.Tab value={'catalogs'}>Catalogs</Tabs.Tab>
                <Tabs.Tab value={'custom'}>Custom</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="catalogs">
                <KeywordCatalogList/>
            </Tabs.Panel>
            <Tabs.Panel value="custom">
                <CustomKeyword/>
            </Tabs.Panel>
        </Tabs>
    )
}