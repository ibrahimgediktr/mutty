import {
    createStyles,
    Title,
    Container,
    Accordion,
    ThemeIcon,
    MantineProvider,
} from '@mantine/core';
import {IconPlus} from '@tabler/icons';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('control');

    return {
        wrapper: {
            paddingTop: theme.spacing.xl * 2,
            minHeight: 820,
            backgroundImage: `radial-gradient(${theme.colors[theme.primaryColor][6]} 0%, ${
                theme.colors[theme.primaryColor][4]
            } 100%)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top left',
            position: 'relative',
            color: theme.black,
        },

        title: {
            color: theme.white,
            fontSize: 52,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            marginBottom: theme.spacing.xl * 1.5,
        },

        item: {
            backgroundColor: theme.white,
            borderBottom: 0,
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.lg,
            overflow: 'hidden',
        },

        control: {
            fontSize: theme.fontSizes.lg,
            padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
            color: theme.black,

            '&:hover': {
                backgroundColor: 'transparent',
            },
        },

        content: {
            paddingLeft: theme.spacing.xl,
            lineHeight: 1.6,
            color: theme.black,
        },

        icon: {
            ref: icon,
            marginLeft: theme.spacing.md,
        },

        gradient: {
            backgroundImage: `radial-gradient(${theme.colors[theme.primaryColor][6]} 0%, ${
                theme.colors[theme.primaryColor][5]
            } 100%)`,
        },

        itemOpened: {
            [`& .${icon}`]: {
                transform: 'rotate(45deg)',
            },
        },

        button: {
            display: 'block',
            marginTop: theme.spacing.md,

            '@media (max-width: 755px)': {
                display: 'block',
                width: '100%',
            },
        },
    };
});

export function FAQ() {
    const {classes} = useStyles();
    return (
        <MantineProvider inherit theme={{colorScheme: 'light'}}>
            <div className={classes.wrapper}>
                <Container size="sm">
                    <Title align="center" className={classes.title}>
                        Frequently Asked Questions
                    </Title>

                    <Accordion
                        chevronPosition="right"
                        defaultValue="authorization"
                        chevronSize={50}
                        variant="separated"
                        disableChevronRotation
                        chevron={
                            <ThemeIcon radius="xl" className={classes.gradient} size={32}>
                                <IconPlus size={18} stroke={1.5}/>
                            </ThemeIcon>
                        }
                    >
                        <Accordion.Item className={classes.item} value="save tokens">
                            <Accordion.Control>Does mutty save or log tokens</Accordion.Control>
                            <Accordion.Panel>
                                Mutty {"doesn't"} save or log tokens. {"It's"} only writing your Twitter OAuth token as httpOnly. {"It's"} sending it with Twitter requests. You can check <a href={'https://github.com/peacecwz/mutty'}>the source codes</a>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="authorization">
                            <Accordion.Control>Twitter has not any API support for muting keywords</Accordion.Control>
                            <Accordion.Panel>
                                Yes you are right but wrong. Actually Twitter has API for muting but {"It's"} not supported by developer created apps. If you find any main Twitter Apps Consumer Key and Secret. It works. Mutty is using {"'Twitter for Mac'"} app. It has muting endpoint access. But we cannot use traditional authroization (redirect to callback). Mutty is using {"'Twitter for mac'"} and {"It's"} not configured with callback. We must to get pin and authorize with Twitter
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="another-account">
                            <Accordion.Control>How Can I add new keyword catalogs?</Accordion.Control>
                            <Accordion.Panel>
                                Open Pull Request to mutty source code repository. You can read how to add new keyword catalogs <a href={''}>This is detaild docs</a>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item className={classes.item} value="credit-card">
                            <Accordion.Control>I {"can't"} trust as mutty.org. Can I run this project on local?</Accordion.Control>
                            <Accordion.Panel>
                                Sure you can.No need to use on {"'mutty.org'"} Clone the repository and run {"'npm install'"} after that. Create .env file into root directory and put your Twitter Consumer key and consumer secret into it. Example:
                                <br />
                                <br />
                                TWITTER_CONSUMER_KEY=3rJOl1OXXXXXXXXXXXXXX
                                TWITTER_CONSUMER_SECRET=5jPoQXXXXXXNE8bQXXXXXXXXXXhvgXXXXXXXXXX
                                <br />
                                <br />
                                Then run {"'npm run dev'"} and enjoy it.
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
        </MantineProvider>
    );
}