"use client";
/**
 * @class Home
 * @description main page of the real time chat application
 * @author Nawod Madhuvantha
 */

import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { MessageContainer } from "@/shared/components/messageContainer/MessageContainer";
import { TextBox } from "@/shared/components/textBox/TextBox";

export default function Home() {
	const { messages } = useSelector((state: RootState) => state.messageStates);

	return (
		<div className="container mx-auto md:max-w-3xl px-4 py-8 overflow-hidden h-screen">
			<div className="flex flex-col gap-4 mb-4 overflow-auto h-4/5">
				<MessageContainer messages={messages} />
			</div>
			<div>
				<TextBox />
			</div>
		</div>
	);
}
