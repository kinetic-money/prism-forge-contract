export const testnet: Config = {
  forge_InitMsg: {
    config: {
      owner: undefined,
      receiver: undefined,
      token: "terra19vzpr6pstw074ahyxyf73yj8hgvm60mwp0xsrf",
      base_denom: "uusd",
    },
  },
  tokenContractAddress: "terra19vzpr6pstw074ahyxyf73yj8hgvm60mwp0xsrf",
  launch_config: {
    config: {
      amount: "8_000_000_000000",
      phase1_start: 1648823452,
      phase2_start: 1648904065,
      phase2_end: 1648935052,
    },
  },
};

interface ForgeInitMsg {
  config: {
    owner?: string;
    receiver?: string;
    token: string;
    base_denom: string;
  };
}

interface LaunchConfig {
  config: {
    amount: string;
    phase1_start: number;
    phase2_start: number;
    phase2_end: number;
  };
}

export interface Config {
  forge_InitMsg: ForgeInitMsg;
  tokenContractAddress: string | undefined;
  launch_config: LaunchConfig;
}
