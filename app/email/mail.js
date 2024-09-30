import emailjs from "@emailjs/browser";

const MAIL_API_KEY = process.env.NEXT_PUBLIC_MAIL_API_KEY;

export async function startMail() {
    emailjs.init(MAIL_API_KEY);
    //sendMail();
}

export async function sendMail(userName, userMail, userPostal, petType, petBreed, petAge, petGender) {
    var params = {
        emMail: userMail,
        emName: userName,
        emPostal: userPostal,
        emPetType: petType,
        emPetBreed: petBreed,
        emPetAge: petAge,
        emPetGender: petGender,
    };
    
    emailjs.send('service_kfgdbhk', 'template_4o43ccg', params).then(
        (response) => {
            console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
            console.log('FAILED...', error);
        },
    );
}