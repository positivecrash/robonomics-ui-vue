import keyring from "@polkadot/ui-keyring";
import {
  AccountManagerUi as AccountManager,
  Robonomics
} from "robonomics-interface";

const robonomics = new Robonomics({
  endpoint: "wss://kusama.rpc.robonomics.network/"
});
robonomics.setAccountManager(new AccountManager(keyring));

export default robonomics;
