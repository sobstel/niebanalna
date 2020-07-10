import produce from "immer";

type Order = {
  url?: string;
  order: string;
  timestamp: number;
};

type State = {
  items: Order[];
  client?: Client;
};

type Action =
  | {
      type: "ORDER_CREATED";
      order: Order;
    }
  | {
      type: "SAVE_CLIENT";
      client: Client;
    };

const INITIAL_STATE = { items: [] };

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ordersReducer(
  state: State = INITIAL_STATE,
  action: Action
) {
  switch (action.type) {
    case "SAVE_CLIENT": {
      return produce(state, (draft) => {
        draft.client = { ...action.client };
      });
    }
    case "ORDER_CREATED": {
      return produce(state, (draft) => {
        draft.items.push({ ...action.order });
      });
    }

    default:
      return state;
  }
}
