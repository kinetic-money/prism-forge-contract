export const testnet: Config = {
  forge_InitMsg: {
    config: {
      operator: undefined,
      receiver: undefined,
      token: undefined,
      base_denom: "uusd",
      host_portion: "0.10",
      host_portion_receiver: undefined,
    },
  },
  tokenContractAddress: "terra19vzpr6pstw074ahyxyf73yj8hgvm60mwp0xsrf",
  launch_config: {
    config: {
      amount: "8_000_000_000000",
      phase1_start: 1649325600,
      phase2_start: 1649354400,
      phase2_end: 1649361600,
      phase2_slot_period: 3600,
    },
  },
};

interface ForgeInitMsg {
  config: {
    operator?: string;
    receiver?: string;
    token?: string;
    base_denom: string;
    host_portion: string;
    host_portion_receiver?: string;
  };
}

interface LaunchConfig {
  config: {
    amount: string;
    phase1_start: number;
    phase2_start: number;
    phase2_end: number;
    phase2_slot_period: number;
  };
}

export interface Config {
  forge_InitMsg: ForgeInitMsg;
  tokenContractAddress: string | undefined;
  launch_config: LaunchConfig;
}
