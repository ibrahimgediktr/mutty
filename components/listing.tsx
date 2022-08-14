import {Grid, Skeleton, Container, Select, createStyles} from '@mantine/core';
import {BadgeCard} from './card';
import {useEffect, useState} from "react";
import {CountryPicker, SelectItem} from "./country-picker";
import {useRouter} from "next/router";

type Category = {
    key: string;
    isMuted?: boolean;
}

type TwitterMute = {
    keyword: string;
}

export function GridAsymmetrical() {
    const [countries, setCountries] = useState([]);
    const [muteCategories, setMuteCategories] = useState([]);
    const [topics, setTopics] = useState<any[]>([]);
    const [myMutedKeywords, setMyMutedKeywords] = useState([]);
    const [selectedTopicKey, setSelectedTopicKey] = useState();
    const [muteKeywordCatalogs, setMuteKeywordCatalogs] = useState([]);
    const [isLogged, setLogged] = useState(false);

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
    }, []);

    return (
        <>
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
                            onChange={(topicKey) => setMuteKeywordCatalogs(muteCategories.filter((c: any) => c.topicKey === topicKey))}
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
                            <BadgeCard
                                image={`https://loremflickr.com/320/240/${m.topicKey}?random=${index}`}
                                title={m.name}
                                description={m.description}
                                topic={m.topic}
                                category={m}
                                isMuted={m.isMuted}
                                isLogged={isLogged}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
        </>
    );
}