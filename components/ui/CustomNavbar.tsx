import { useSignOut, useUserData } from "@nhost/react";
import { Navbar, Text, Dropdown, Avatar, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';

const collapseItems = [
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Profile',
        to: '/profile'
    },
];

export const CustomNavbar = () => {

    const { asPath } = useRouter()
    return (
        <Navbar isBordered variant="sticky" >
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
                css={{
                    "@xs": {
                        w: "12%",
                    },
                }}
            >
                <Text b color="inherit" hideIn="xs">
                    LinkTree
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                enableCursorHighlight
                activeColor="secondary"
                hideIn="xs"
                variant="underline"
            >
                {
                    collapseItems.map(({ label, to }) => (
                        <Navbar.Link isActive={asPath === to} href={to} key={to}>{label}</Navbar.Link>
                    ))
                }
            </Navbar.Content>

            <Navbar.Content
                css={{
                    "@xs": {
                        w: "12%",
                        jc: "flex-end",
                    },
                }}
            >
                <DropDown />

            </Navbar.Content>

            <NavbarCollapse />

        </Navbar >
    )
}

export const DropDown = () => {
    const user = useUserData()
    const { signOut } = useSignOut()

    return (
        <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
                <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src={user?.avatarUrl}
                />
            </Dropdown.Trigger>
            <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => {
                    if (actionKey === 'logout') return signOut()
                }}

            >
                <Dropdown.Item key="profile" css={{ height: "$24" }}>
                    <Text b color="inherit" css={{ d: "flex", mb: '.5em' }}>
                        Signed in as
                    </Text>
                    <Text b color="warning" css={{ wordBreak: 'break-word' }}>
                        {user?.email}
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export const NavbarCollapse = () => {

    const { asPath } = useRouter()
    return (
        <Navbar.Collapse>

            {
                collapseItems.map(({ label, to }) => (
                    <Navbar.CollapseItem
                        key={to}
                        activeColor="secondary"
                        isActive={asPath === to}
                    >
                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
                            }}
                            href={to}
                        >
                            {label}
                        </Link>
                    </Navbar.CollapseItem>

                ))
            }

        </Navbar.Collapse>
    )
}