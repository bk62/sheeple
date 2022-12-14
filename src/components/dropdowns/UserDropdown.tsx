import { useSession, signIn, signOut } from 'next-auth/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import WalletDisplay from '../auth/WalletDisplay'


function classNames(...classes: (string | number)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function UserDropdown() {
    const { data: session } = useSession();

    // wagmi
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    });
    const { disconnect } = useDisconnect();

    return (
        <Menu as="div" className="relative inline-block text-left cursor-pointer">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-500 bg-gray-700 px-2.5 py-1.5 text-sm font-normal text-gray-300 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {session ? session.user?.name : "User Settings"}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-500 rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div className="py-1">
                        {isConnected && address && (
                            <div className="text-xs flex justify-between items-center text-gray-400 px-4 pt-1 pb-0">
                                <div className="flex items-center">
                                    <span className="rounded-full shrink-0 bg-green-500 w-1.5 h-1.5 mr-2"></span>
                                    <div className="grow-0 justify-self-start text-xss">
                                        Connected
                                    </div>
                                </div>
                                <WalletDisplay address={address} />
                            </div>
                        )}
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={classNames(
                                        active ? 'bg-gray-600 text-gray-200' : 'text-gray-300',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={isConnected ? () => disconnect() : () => connect()}
                                >
                                    {`${isConnected ? "Dis" : "C"}onnect`} Wallet
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    className={classNames(
                                        active ? 'bg-gray-600 text-gray-200' : 'text-gray-300',
                                        'block px-4 py-2 text-sm'
                                    )}
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
