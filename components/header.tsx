import {useState} from 'react';
import {createStyles, Header as HeaderComponent, Group, ActionIcon, Container, Burger} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconBrandGithub} from '@tabler/icons';
import {MantineLogo} from '@mantine/ds';
import Link from "next/link";
import {GITHUB_URL, TWITTER_URL} from "../services/app.services";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    social: {
        width: 260,

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

    burger: {
        marginRight: theme.spacing.md,

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));

interface HeaderActionProps {
    links: { link: string; label: string; target?: boolean; }[];
}

export function Header({links}: HeaderActionProps) {
    const [opened, {toggle}] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const {classes, cx} = useStyles();

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={cx(classes.link, {[classes.linkActive]: active === link.link})}
            onClick={(event) => {
                setActive(link.link);
            }}
        >
            {link.label}
        </a>
    ));

    return (
        <HeaderComponent height={56} mb={120}>
            <Container className={classes.inner}>
                <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger}/>
                <Group className={classes.links} spacing={5}>
                    {items}
                </Group>

                <Container>
                    {/* TODO (peacecwz): Design a logo for better UI */}
                    Mutty
                </Container>

                <Group spacing={0} className={classes.social} position="right" noWrap>
                    <Link target={'_blank'} href={TWITTER_URL}>
                        <ActionIcon size="lg">
                            <IconBrandTwitter size={18} stroke={1.5}/>
                        </ActionIcon>
                    </Link>
                    <Link href={GITHUB_URL} target={'_blank'}>
                        <ActionIcon size="lg">
                            <IconBrandGithub size={18} stroke={1.5}/>
                        </ActionIcon>
                    </Link>
                </Group>
            </Container>
        </HeaderComponent>
    );
}