import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody
} from "react-accessible-accordion";

const FAQ = () => (
	<Accordion>
		<AccordionItem>
			<AccordionItemTitle>
				<h3>How long does it take to transfer payment to marchant</h3>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>Body Content</p>
			</AccordionItemBody>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemTitle>
				<h3>When should marchant send the good</h3>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>Body Content</p>
			</AccordionItemBody>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemTitle>
				<h3>What if the good is delivered and buyer stops responding</h3>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>Body content</p>
			</AccordionItemBody>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemTitle>
				<h3>What if marchant does not accept refunds</h3>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>Body content</p>
			</AccordionItemBody>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemTitle>
				<h3>What if good is damaged before it gets delivered to buyer</h3>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>Body content</p>
			</AccordionItemBody>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemTitle>
				<h3>How long does it take to resolve dispute</h3>
			</AccordionItemTitle>
			<AccordionItemBody>
				<p>Body content</p>
			</AccordionItemBody>
		</AccordionItem>
	</Accordion>
);

export default FAQ;
