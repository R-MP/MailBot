const pawImage = '../imgs/icon.png';
const mudkip = '../imgs/mudkip.jpg';
const plane = '../imgs/paper-plane-solid.svg';

export function getStyle() {

    const style = {
        bodyStyle: {
            backgroundColor: 'rgba(52, 52, 52, alpha)'
        },
        chatWindowStyle: {
            backgroundImage: 'url(' + pawImage + ')',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        },

        userBubbleStyle: {
            color: '#000000',
        },
        notificationButtonStyle: {
            image: 'url(' + plane + ')',
        },
        notificationButtonDisabledStyle: {
            backgroundImage: 'url(' + mudkip + ')',
        },
        sendIconStyle: {
            backgroundImage: 'url(' + plane + ')',
        },
        footerStyle: {
            background: 'linear-gradient(90deg, #ffe203, #ff03fb)',
            color: '#fff',
        }
    }

    return style;
}