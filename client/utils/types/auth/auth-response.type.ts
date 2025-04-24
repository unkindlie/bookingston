import { TLoggedUser } from "./logged-user.type";
import { TJwtTokens } from "./tokens.type";

export type TAuthResponse = {
    user: TLoggedUser;
    tokens: TJwtTokens;
};
