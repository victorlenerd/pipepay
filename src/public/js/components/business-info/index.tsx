import React, { useCallback, useEffect, useRef, useState } from "react";
import NProgress from "nprogress";
import { IWithAppContext, withAppContext } from "../../contexts/app.context";

interface IProps {
	updateMode ?: boolean
	onComplete ?: () => void
}

const BusinessInfo = (props: IProps & IWithAppContext) => {
	// @ts-ignore:
	const { appContext: { user, setCurrentUser }, updateMode, onComplete } = props;

	if (!Boolean(user)) {
		return null;
	}

	let { sub: userId, token = null, sellerInfo } = user;

	if (!Boolean(sellerInfo)) {
		// @ts-ignore:
		sellerInfo = {};
	}

	const {
		address: defaultAddress = "",
		facebook_username: defaultFBUsername = "",
		instagram_username: defaultIGUsername =  "",
		twitter_username: defaultTWUsername = "",
		website_url: defaultWebsiteUrl = "",
	} = sellerInfo;

	const [state, setState] = useState({
		canSubmit: false,
		address: defaultAddress,
		facebook_username: defaultFBUsername,
		instagram_username: defaultIGUsername,
		twitter_username: defaultTWUsername,
		website_url: defaultWebsiteUrl,
		error: null
	});

	const formRef = useRef<HTMLFormElement>();

	const {address, facebook_username, instagram_username, website_url, twitter_username, canSubmit, error} = state;

		useEffect(() => {
			if (!canSubmit && formRef.current.checkValidity()) {
				const usernames = [facebook_username, instagram_username, twitter_username, website_url];
				const usernamesValidity = usernames.some((username) => Boolean(username));
				if (usernamesValidity) {
					setState((state) => ({ ...state, canSubmit: true }));
				}
			}
	}, [state]);

		const submitSellerInfo = useCallback(async () => {
			NProgress.start();

			let url = "/api/seller";

			if (updateMode) {
				url += "/" + userId
			}

			const body = await fetch( url, {
				method: updateMode ? "PUT" : "POST",
				body: JSON.stringify({
					address,
					instagram_username,
					facebook_username,
					twitter_username,
					website_url
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			}).then((res) => res.json());

			NProgress.done();

			// @ts-ignore:
			const { error = null, status = null, sellerInfo = null } = body;

			if (!status) {
				setState((state) => ({
					...state,
					error
				}));
			} else {
				setCurrentUser({
					...user,
					sellerInfo
				});
			}
		}, [state]);

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();
		if (canSubmit) {
			await submitSellerInfo();
			onComplete();
		}
	}, [state]);

	const setFromValue = useCallback((e) => {
			const { name, value } = e.target;
			setState((state) => ({
				...state,
				[name]: value
			}));
	}, [state]);

	return (
		<>
			<form ref={formRef} onSubmit={handleSubmit} name="seller-info-form">
				{error && <div className="alert alert-danger">{error}</div>}
				<label htmlFor="">Business Address</label>
				<input
					value={address}
					onChange={setFromValue}
					type="address"
					autoComplete="address"
					name="address"
					className="text-input"
					required
				/>
				<br />
				<br />
				<h3>Social media account details</h3>
				<p>Provide at least one username where buyers can discover your product.</p>
				<br />
				<br />
				<label htmlFor="">Facebook Username</label>
				<input
					onChange={setFromValue}
					type="username"
					value={facebook_username}
					name="facebook_username"
					className="text-input"
				/>
				<br />
				<br />
				<label htmlFor="">Twitter Username</label>
				<input
					value={twitter_username}
					onChange={setFromValue}
					type="username"
					name="twitter_username"
					className="text-input"
				/>
				<br />
				<br />
				<label htmlFor="">Instagram Username</label>
				<input
					value={instagram_username}
					onChange={setFromValue}
					type="username"
					name="instagram_username"
					className="text-input"
				/>
				<br />
				<br />
				<label htmlFor="">Website</label>
				<input
					value={website_url}
					onChange={setFromValue}
					type="url"
					name="website_url"
					className="text-input"
				/>
				<br />
				<br />
				<br />
				<br />
				<input
					disabled={!canSubmit}
					type="submit"
					value="DONE"
					className={!updateMode ? "text-submit" : "text-submit text-submit-remove-margin"}
				/>
			</form>
		</>
	)
};

export default withAppContext(BusinessInfo) as React.ComponentType<IProps>;
