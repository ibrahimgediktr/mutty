import {createStyles, Container, Group, Anchor} from '@mantine/core';
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: 120,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

interface FooterSimpleProps {
    links: { link: string; label: string }[];
}

export function Footer({links}: FooterSimpleProps) {
    const {classes} = useStyles();
    const items = links.map((link) => (
        <Anchor<'a'>
            color="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <div className={'flex space-x-1 flex-row'}>
                    <span>
                        Build with
                    </span>
                    <Link href={"https://github.com/mantinedev/mantine"}>
                        <a>Mantine</a>
                    </Link>
                    <span>UI</span>
                </div>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}