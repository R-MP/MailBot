const pawImage = '../imgs/icon.png';
const chatIcon = '../imgs/mudkip.jpg';

export function getSettings() {

    const settings = {
        general: {
            primaryColor: "#ffe203",
            secondaryColor: "#ff03fb",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', " +
                "'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', " +
                "sans-serif",
            showHeader: true,
            showFooter: true,
            showInputRow: true,
            embedded: false,
            desktopEnabled: true,
            mobileEnabled: true,
            flowStartTrigger: "ON_LOAD",
        },
        tooltip: {
            mode: "CLOSE",
            text: "Posso ajudar? 😊",
        },
        chatButton: {
            icon: chatIcon,
        },
        header: {
            title: (
                <div style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>
                    Bot4Pets
                </div>
            ),
            showAvatar: false,
            avatar: pawImage,
        },
        chatHistory: {
            disabled: true,
        },
        chatInput: {
            disabled: false,
            allowNewline: false,
            enabledPlaceholderText: "Fale conosco...",
            disabledPlaceholderText: "",
            showCharacterCount: false,
            characterLimit: -1,
            botDelay: 1000,
            blockSpam: true,
            sendOptionOutput: true,
            sendCheckboxOutput: true,
        },
        chatWindow: {
            showScrollbar: false,
            background: chatIcon,
            autoJumpToBottom: false,
            showMessagePrompt: true,
            messagePromptText: "Novas mensagens ↓",
            messagePromptOffset: 30,
            defaultOpen: false,
        },
        sensitiveInput: {
            maskInTextArea: true,
            maskInUserBubble: true,
            asterisksCount: 10,
            hideInUserBubble: false,
        },
        userBubble: {
            animate: true,
            showAvatar: false,
            simStream: false,
            streamSpeed: 30,
            dangerouslySetInnerHtml: false,
        },
        botBubble: {
            animate: true,
            showAvatar: false,
            simStream: false,
            streamSpeed: 30,
            dangerouslySetInnerHtml: false,
        },
        voice: {
            disabled: true,
        },
        footer: {
            text: (
                <div>
                    <span key={0}>Powered By </span>
                    <span key={2} style={{ fontWeight: "bold" }}> Match4Pets</span>
                </div>
            )
        },
        fileAttachment: {
            disabled: true,
        },
        emoji: {
            disabled: true,
        },
        toast: {
            maxCount: 3,
            forbidOnMax: false,
            dismissOnClick: true,
        },
        event: {
            rcbPreInjectMessage: false,
            rcbPostInjectMessage: false,
            rcbStartStreamMessage: false,
            rcbChunkStreamMessage: false,
            rcbStopStreamMessage: false,
            rcbRemoveMessage: false,
            rcbLoadChatHistory: false,
            rcbToggleChatWindow: false,
            rcbToggleAudio: false,
            rcbToggleNotifications: false,
            rcbToggleVoice: false,
            rcbChangePath: false,
            rcbShowToast: false,
            rcbDismissToast: false,
            rcbUserSubmitText: false,
            rcbUserUploadFile: false,
            rcbTextAreaChangeValue: false,
        }
    }

    return settings;
}