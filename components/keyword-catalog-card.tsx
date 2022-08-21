import {Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles} from '@mantine/core';
import * as ga from '../utils/ga';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

interface BadgeCardProps {
    image: string;
    title: string;
    topic: string;
    description: string;
    category: any;
    isMuted: boolean;
    isLogged: boolean;
    country: string;
}

export function KeywordCatalogCard({
                                       image,
                                       title,
                                       description,
                                       topic,
                                       category,
                                       isMuted,
                                       isLogged,
                                       country
                                   }: BadgeCardProps) {
    const {classes, theme} = useStyles();

    const mute = async () => {
        const result = await fetch(`/mute-dictionaries/${country}/${category.topicKey}/${category.key}.json`).then(res => res.json());
        result.push(`mutty:${category.key}`);

        await fetch('/api/mutes/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keywords: result
            })
        })

        ga.event({
            action: "MUTE_KEYWORD",
            params: {
                country: country,
                topic: category.topicKey,
                category: category.key
            }
        })

        window.location.reload();
    }

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={image} alt={title} height={180}/>
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group position="apart">
                    <Text size="lg" weight={500}>
                        {title}
                    </Text>
                    <Badge size="sm">{topic}</Badge>
                </Group>
                <Text size="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <Group mt="xs">
                <Button onClick={mute} disabled={!isLogged || isMuted} radius="md" style={{flex: 1}}>
                    Mute this
                </Button>
            </Group>
        </Card>
    );
}