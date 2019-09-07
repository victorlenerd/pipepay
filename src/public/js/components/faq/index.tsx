import React from "react";
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemPanel
} from "react-accessible-accordion";

const FAQ = () => (
	<Accordion>
		<AccordionItem>
			<AccordionItemHeading>
				How long does it take to transfer payment to merchant
			</AccordionItemHeading>
			<AccordionItemPanel>
				<p>Body Content</p>
			</AccordionItemPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemHeading>
				<h3>When should merchant send the good</h3>
			</AccordionItemHeading>
			<AccordionItemPanel>
				<p>Body Content</p>
			</AccordionItemPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemHeading>
				<h3>What if the good is delivered and buyer stops responding</h3>
			</AccordionItemHeading>
			<AccordionItemPanel>
				<p>Body content</p>
			</AccordionItemPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemHeading>
				<h3>What if merchant does not accept refunds</h3>
			</AccordionItemHeading>
			<AccordionItemPanel>
				<p>Body content</p>
			</AccordionItemPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemHeading>
				<h3>What if good is damaged before it gets delivered to buyer</h3>
			</AccordionItemHeading>
			<AccordionItemPanel>
				<p>Body content</p>
			</AccordionItemPanel>
		</AccordionItem>
		<AccordionItem>
			<AccordionItemHeading>
				<h3>How long does it take to resolve dispute</h3>
			</AccordionItemHeading>
			<AccordionItemPanel>
				<p>Body content</p>
			</AccordionItemPanel>
		</AccordionItem>
	</Accordion>
);

export default FAQ;
