'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient, createConfig, WagmiProvider } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { mainnet, polygon, polygonZkEvmCardano } from 'wagmi/chains';
import { publicClient } from '@wagmi/core';

const config = createConfig(
    getDefaultConfig({
        // Your dApps chains
        chains: [polygonZkEvmCardano],
        transports: {
            [polygonZkEvmCardano.id]: publicClient({
                rpcUrl: `https://polygonzkevm-cardona.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
            }),
        },
        // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
        // Required App Info
        appName: 'Dabl DevCamp',
        // Optional App Info
        appDescription: 'Become a dApp developer in 2 weeks',
        appUrl: 'https://localhost:3000', // your app's url
        appIcon: 'https://localhost:3000/dablclub-512x512.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
