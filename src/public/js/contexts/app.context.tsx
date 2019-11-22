import React from "react";

interface IAppContext {
	signedIn: boolean
	user: {
		sellerInfo: {
			address: string,
			facebook_username: string,
			instagram_username: string,
			twitter_username: string,
			website_url: string,
			balance: number
		}, sub, token } | null
	error: unknown | null,
	confirmPassword: () => void,
	confirmPasswordCallback: () => void,
	updateSession: (callback: () => void) => void,
	setCurrentUser: (user: unknown | null) => void
}

const AppContext = React.createContext<IAppContext>(null);

export interface IWithAppContext {
	appContext: IAppContext
}

export const withAppContext = (Component) => {
		return class WithAppContext extends React.Component {
			render() {
				return (
					<AppContext.Consumer>
						{context => (<Component {...this.props} appContext={context} />)}
					</AppContext.Consumer>
				);
			}
		}
};

export default AppContext;
