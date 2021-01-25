import axios from 'axios';
import { config } from '../config/system';
import res from '../response-example.json';
import { NetworksStatus, NetworkStatusResponse } from '../types/network-stats';
import _ from 'lodash';
import env from '../system/load-env-data';

export const fetchBlockchainData = async () => {
    const { data }: { data: NetworkStatusResponse } = await axios.get(
        env.NETWORK_INFO_API_URL
    );
    const networkData = data.data;

    const networkStatus: NetworksStatus = Object.entries(networkData)
        .reduce((networks: Array<any>, [networkName, network]) => {
            const reducedNetwork = {
                name: networkName,
                ..._.pick(network.data, config.networkUsageFields),
            };

            return [...networks, reducedNetwork];
        }, [])
        .filter(({ name }) => {
            return config.networksActive.includes(name);
        });

    console.log(networkStatus);

    // const result = Object.entries(data).reduce((_, acc, [k, v]) => {
    //   return [];
    // });
};
