import {
    createStyles,
    Title,
    Text,
    Button,
    Container,
    Modal,
    Paper,
    TextInput,
    Group
} from '@mantine/core';
import {IconBrandGithub, IconBrandTwitter} from "@tabler/icons";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useForm} from '@mantine/form';
import Link from "next/link";
import {detect, BrowserInfo, SearchBotDeviceInfo, BotInfo, NodeInfo, ReactNativeInfo} from "../utils/browser";

import * as ga from '../utils/ga';

interface DotsProps extends React.ComponentPropsWithoutRef<'svg'> {
    size?: number;
    radius?: number;
}

function Dots({size = 185, radius = 2.5, ...others}: DotsProps) {
    return (
        <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 185 185"
            width={size}
            height={size}
            {...others}
        >
            <rect width="5" height="5" rx={radius}/>
            <rect width="5" height="5" x="60" rx={radius}/>
            <rect width="5" height="5" x="120" rx={radius}/>
            <rect width="5" height="5" x="20" rx={radius}/>
            <rect width="5" height="5" x="80" rx={radius}/>
            <rect width="5" height="5" x="140" rx={radius}/>
            <rect width="5" height="5" x="40" rx={radius}/>
            <rect width="5" height="5" x="100" rx={radius}/>
            <rect width="5" height="5" x="160" rx={radius}/>
            <rect width="5" height="5" x="180" rx={radius}/>
            <rect width="5" height="5" y="20" rx={radius}/>
            <rect width="5" height="5" x="60" y="20" rx={radius}/>
            <rect width="5" height="5" x="120" y="20" rx={radius}/>
            <rect width="5" height="5" x="20" y="20" rx={radius}/>
            <rect width="5" height="5" x="80" y="20" rx={radius}/>
            <rect width="5" height="5" x="140" y="20" rx={radius}/>
            <rect width="5" height="5" x="40" y="20" rx={radius}/>
            <rect width="5" height="5" x="100" y="20" rx={radius}/>
            <rect width="5" height="5" x="160" y="20" rx={radius}/>
            <rect width="5" height="5" x="180" y="20" rx={radius}/>
            <rect width="5" height="5" y="40" rx={radius}/>
            <rect width="5" height="5" x="60" y="40" rx={radius}/>
            <rect width="5" height="5" x="120" y="40" rx={radius}/>
            <rect width="5" height="5" x="20" y="40" rx={radius}/>
            <rect width="5" height="5" x="80" y="40" rx={radius}/>
            <rect width="5" height="5" x="140" y="40" rx={radius}/>
            <rect width="5" height="5" x="40" y="40" rx={radius}/>
            <rect width="5" height="5" x="100" y="40" rx={radius}/>
            <rect width="5" height="5" x="160" y="40" rx={radius}/>
            <rect width="5" height="5" x="180" y="40" rx={radius}/>
            <rect width="5" height="5" y="60" rx={radius}/>
            <rect width="5" height="5" x="60" y="60" rx={radius}/>
            <rect width="5" height="5" x="120" y="60" rx={radius}/>
            <rect width="5" height="5" x="20" y="60" rx={radius}/>
            <rect width="5" height="5" x="80" y="60" rx={radius}/>
            <rect width="5" height="5" x="140" y="60" rx={radius}/>
            <rect width="5" height="5" x="40" y="60" rx={radius}/>
            <rect width="5" height="5" x="100" y="60" rx={radius}/>
            <rect width="5" height="5" x="160" y="60" rx={radius}/>
            <rect width="5" height="5" x="180" y="60" rx={radius}/>
            <rect width="5" height="5" y="80" rx={radius}/>
            <rect width="5" height="5" x="60" y="80" rx={radius}/>
            <rect width="5" height="5" x="120" y="80" rx={radius}/>
            <rect width="5" height="5" x="20" y="80" rx={radius}/>
            <rect width="5" height="5" x="80" y="80" rx={radius}/>
            <rect width="5" height="5" x="140" y="80" rx={radius}/>
            <rect width="5" height="5" x="40" y="80" rx={radius}/>
            <rect width="5" height="5" x="100" y="80" rx={radius}/>
            <rect width="5" height="5" x="160" y="80" rx={radius}/>
            <rect width="5" height="5" x="180" y="80" rx={radius}/>
            <rect width="5" height="5" y="100" rx={radius}/>
            <rect width="5" height="5" x="60" y="100" rx={radius}/>
            <rect width="5" height="5" x="120" y="100" rx={radius}/>
            <rect width="5" height="5" x="20" y="100" rx={radius}/>
            <rect width="5" height="5" x="80" y="100" rx={radius}/>
            <rect width="5" height="5" x="140" y="100" rx={radius}/>
            <rect width="5" height="5" x="40" y="100" rx={radius}/>
            <rect width="5" height="5" x="100" y="100" rx={radius}/>
            <rect width="5" height="5" x="160" y="100" rx={radius}/>
            <rect width="5" height="5" x="180" y="100" rx={radius}/>
            <rect width="5" height="5" y="120" rx={radius}/>
            <rect width="5" height="5" x="60" y="120" rx={radius}/>
            <rect width="5" height="5" x="120" y="120" rx={radius}/>
            <rect width="5" height="5" x="20" y="120" rx={radius}/>
            <rect width="5" height="5" x="80" y="120" rx={radius}/>
            <rect width="5" height="5" x="140" y="120" rx={radius}/>
            <rect width="5" height="5" x="40" y="120" rx={radius}/>
            <rect width="5" height="5" x="100" y="120" rx={radius}/>
            <rect width="5" height="5" x="160" y="120" rx={radius}/>
            <rect width="5" height="5" x="180" y="120" rx={radius}/>
            <rect width="5" height="5" y="140" rx={radius}/>
            <rect width="5" height="5" x="60" y="140" rx={radius}/>
            <rect width="5" height="5" x="120" y="140" rx={radius}/>
            <rect width="5" height="5" x="20" y="140" rx={radius}/>
            <rect width="5" height="5" x="80" y="140" rx={radius}/>
            <rect width="5" height="5" x="140" y="140" rx={radius}/>
            <rect width="5" height="5" x="40" y="140" rx={radius}/>
            <rect width="5" height="5" x="100" y="140" rx={radius}/>
            <rect width="5" height="5" x="160" y="140" rx={radius}/>
            <rect width="5" height="5" x="180" y="140" rx={radius}/>
            <rect width="5" height="5" y="160" rx={radius}/>
            <rect width="5" height="5" x="60" y="160" rx={radius}/>
            <rect width="5" height="5" x="120" y="160" rx={radius}/>
            <rect width="5" height="5" x="20" y="160" rx={radius}/>
            <rect width="5" height="5" x="80" y="160" rx={radius}/>
            <rect width="5" height="5" x="140" y="160" rx={radius}/>
            <rect width="5" height="5" x="40" y="160" rx={radius}/>
            <rect width="5" height="5" x="100" y="160" rx={radius}/>
            <rect width="5" height="5" x="160" y="160" rx={radius}/>
            <rect width="5" height="5" x="180" y="160" rx={radius}/>
            <rect width="5" height="5" y="180" rx={radius}/>
            <rect width="5" height="5" x="60" y="180" rx={radius}/>
            <rect width="5" height="5" x="120" y="180" rx={radius}/>
            <rect width="5" height="5" x="20" y="180" rx={radius}/>
            <rect width="5" height="5" x="80" y="180" rx={radius}/>
            <rect width="5" height="5" x="140" y="180" rx={radius}/>
            <rect width="5" height="5" x="40" y="180" rx={radius}/>
            <rect width="5" height="5" x="100" y="180" rx={radius}/>
            <rect width="5" height="5" x="160" y="180" rx={radius}/>
            <rect width="5" height="5" x="180" y="180" rx={radius}/>
        </svg>
    );
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 30,
        paddingBottom: 80,

        '@media (max-width: 755px)': {
            paddingTop: 80,
            paddingBottom: 60,
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    dots: {
        position: 'absolute',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

        '@media (max-width: 755px)': {
            display: 'none',
        },
    },

    dotsLeft: {
        left: 0,
        top: 0,
    },

    title: {
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        '@media (max-width: 520px)': {
            fontSize: 28,
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
    },

    description: {
        textAlign: 'center',

        '@media (max-width: 520px)': {
            textAlign: 'left',
            fontSize: theme.fontSizes.md,
        },
    },

    controls: {
        marginTop: theme.spacing.lg,
        display: 'flex',
        justifyContent: 'center',

        '@media (max-width: 520px)': {
            flexDirection: 'column',
        },
    },

    control: {
        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        '@media (max-width: 520px)': {
            height: 42,
            fontSize: theme.fontSizes.md,

            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },
}));

export function Hero() {
    // TODO (peacecwz): Refactor here It's so long. You can extract modal and login logic into another component
    const {reload} = useRouter();
    const [canOpenPopup, setCanOpenPopup] = useState(false);
    const [oauthToken, setOauthToken] = useState('');
    const [openedWindow, setOpenedWindow] = useState<WindowProxy | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [authorizeUrl, setAuthorizeUrl] = useState<string>()
    const [browser, setBrowser] = useState<BrowserInfo
        | SearchBotDeviceInfo
        | BotInfo
        | NodeInfo
        | ReactNativeInfo
        | null>();
    const {classes} = useStyles();
    const timer = useRef();

    const handleWindowPopup = (url: string, onPopupClose: () => void) => {
        const windowPopup = window.open(`/api/account/login-redirect?url=${url}`, 'Login to Mutty on Twitter', `_target=blank,width=600,height=800,left=${window.innerWidth}`);

        // @ts-ignore
        timer.current = setInterval(() => {
            // @ts-ignore
            if (windowPopup.closed) {
                clearInterval(timer.current);
                onPopupClose();
            }
        }, 1000);

        return windowPopup;
    };

    const getAuthorizeUrl = async () => {
        const {authorizeURL, oauth_token} = await fetch('/api/account/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json());
        setOauthToken(oauth_token);
        return authorizeURL;
    }

    function handleOpenedPopup() {
        setTimeout(() => {
            ga.event({
                action: "LOGIN_START",
                params: {}
            })
            setCanOpenPopup(true);
        }, 3 * 1000);
    }

    const handleLogin = async () => {
        const authorizeURL = await getAuthorizeUrl();

        // TODO (peacecwz): Safari cannot allow if your popup url is different with your origin domain. Create an endpoint and get redirect url as parameter. Be carefull redirect attacks
        const popupWindow = handleWindowPopup(authorizeURL, () => {
            ga.event({
                action: "EXTERNAL_POPUP_CLOSED",
                params: {}
            })
            setCanOpenPopup(false);
        });
        setOpenedWindow(popupWindow);

        handleOpenedPopup();
    };

    const handleSubmit = async (data: any) => {
        const {success, username} = await fetch('/api/account/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pin: data.pin,
                oauth_token: oauthToken
            })
        }).then(res => res.json());

        if (success) {
            ga.event({
                action: "LOGIN_COMPLETE",
                params: {}
            })
            localStorage.setItem('TWITTER_USERNAME', username)
            openedWindow?.close();
            reload()
        } else {
            ga.event({
                action: "LOGIN_FAILED",
                params: {}
            })
        }
    }

    const form = useForm({
        initialValues: {pin: ''},

        validate: {
            pin: (value) => (value.length < 7 ? 'Incorrect Twitter Pin' : null),
        },
    });

    const handleLogout = async () => {
        const {success} = await fetch('/api/account/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

        if (success) {
            ga.event({
                action: "LOGOUT",
                params: {}
            })
            localStorage.removeItem('TWITTER_USERNAME');
            reload()
        } else {
            ga.event({
                action: "LOGOUT_FAILED",
                params: {}
            })
        }
    }

    useEffect(() => {
        if (!window) return

        let browser = detect();
        setBrowser(browser)

        if (browser?.name === "safari") {
            getAuthorizeUrl().then(authorizeURL => {
                setAuthorizeUrl(authorizeURL)
            })
        }

        setUsername(localStorage.getItem('TWITTER_USERNAME'))
    }, []);

    const LoginButton = () => {
        if (authorizeUrl) {
            return <a
                href={authorizeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                    handleOpenedPopup()
                }}
                className={"flex items-center font-bold text-white py-2 px-6 rounded bg-tw-100 hover:bg-sky-700"}
            >
                <IconBrandTwitter className={'mr-1'} size={18} fill={'white'}/>
                Login with Twitter
            </a>
        }

        return <Button className={'bg-tw-100'} onClick={handleLogin} size="lg">
            <IconBrandTwitter className={'mr-1'} size={18} fill={'white'}/>
            Login with Twitter
        </Button>
    }

    return (
        <>
            <Modal
                opened={canOpenPopup}
                onClose={() => {
                    ga.event({
                        action: "POPUP_CLOSED",
                        params: {}
                    })
                    setCanOpenPopup(false)
                    openedWindow?.close();
                }}
                title="Authorize Twitter with PIN"
            >
                <Container size={460} my={30}>
                    <form onSubmit={form.onSubmit(async (values) => await handleSubmit(values))}>
                        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                            <TextInput {...form.getInputProps('pin')} label="Twitter PIN" placeholder="123456"
                                       required/>
                            <Group position="apart" mt="lg" className={classes.controls}>
                                <Button type={'submit'} className={'bg-tw-100'}>Authorize</Button>
                            </Group>
                        </Paper>
                    </form>
                </Container>
            </Modal>
            <Container className={classes.wrapper} size={1400}>
                <Dots className={classes.dots} style={{left: 0, top: 0}}/>
                <Dots className={classes.dots} style={{left: 0, top: 140}}/>
                <Dots className={classes.dots} style={{right: 0, top: 0}}/>
                <Dots className={classes.dots} style={{right: 0, top: 140}}/>

                <div className={classes.inner}>
                    <Title className={classes.title}>
                        Make better{' '}
                        <Text component="span" className={classes.highlight} inherit>
                            Twitter Timeline
                        </Text>
                        {' '}with Mutty
                    </Title>

                    <Container p={0} size={600}>
                        <Text size="lg" color="dimmed" className={classes.description}>
                            Easy way to mute many content for better Twitter Timelines with Mutty.
                            Mutty is open-sourced mute keywords manager for Twitter. You can add your muted word list
                            and
                            share to other Twitter users
                        </Text>
                    </Container>

                    <div className={classes.controls}>
                        {username ? (
                            <Button className={'bg-red-600'} onClick={handleLogout} color={'red'} size="lg">
                                Logout @{username}
                            </Button>
                        ) : (
                            <LoginButton/>
                        )}
                        <Link href={"https://github.com/peacecwz/mutty"} target={'_blank'}>
                            <Button className={'ml-2 bg-black text-white hover:bg-gray-500'} size="lg"
                                    variant="default">
                                <IconBrandGithub className={'mr-1'} size={18} fill={'white'}/>
                                Github
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </>
    );
}