# Forge Deployment

Deploy forge 

```sh
# build the smart contracts
./scripts/build_artifacts.sh

cd scripts
npm install


export WALLET="<mnemonic seed>"
export LCD_CLIENT_URL="https://bombay-lcd.terra.dev"
export CHAIN_ID="bombay-12"


# ensure the deploy_config.ts has a cw20_code_id specified for above network

npm run forge
```


**Set environment variables**

 For bombay testnet -
 ```bash
 export WALLET="<mnemonic seed>"
 export LCD_CLIENT_URL="https://bombay-lcd.terra.dev"
 export CHAIN_ID="bombay-12"
 ```

 For mainnet -
 ```bash
 export WALLET="<mnemonic seed>"
 export LCD_CLIENT_URL="https://lcd.terra.dev"
 export CHAIN_ID="columbus-5"
 ```
