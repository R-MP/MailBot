import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Acessa a variável de ambiente

const genAI = new GoogleGenerativeAI(API_KEY);

//autoexplicativo
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings });

let listVariables = {};

let requiredVariables = {
    userName: 'not defined',
    userMail: 'not defined',
    userPostal: 'not defined',
    petType: 'not defined',
    petBreed: 'not defined',
    petAge: 'not defined',
    petGender: 'not defined'
};

let chat;
let chatHistory = [];
let requirePrompt = "";

export async function initializeChat(updateFlow) {
    try {
        chat = await model.startChat({
            history: [
                {
                    "role": "user", "parts": [{
                        text:
                            " Seu trabalho é ser um chatbot inteligente responsavel por auxiliar na adoção de animais por meio do site que você esta hospedado." +
                            " Você respondera de forma extremamente especifica seguindo um modelo pre-definido de mensagem para poder ser mais facilmente editado no backend." +
                            " Perguntas aleatorias e sem correlação com adocoes ou o site em si devem ser respondidas tambem mas de maneira curta e rapida" +
                            " e depois de respondidas o chatbot deve tentar retornar ao contexto de adoçao de animais de forma natural e simpática." +
                            " O usuario tambem mandara uma mensagem sobre quais variaveis estão faltando perguntar a ele, pergunte sempre uma por vez e" +
                            " em seguida ele mandara a lista atualizada." +
                            " depois de todas as variaveis serem definidas, peça para o usuario recarregar o chat para buscar outro animal." +
                            " Exemplo usuario:" +
                            " Bom dia, tudo bem?" +
                            " Exemplo chatbot:" +
                            " Bom dia! Tudo sim e você?" +
                            " &cbm4p// (Separador para interpretação do codigo)" +
                            " (Nessa parte vc detectara variaveis importantes e colocara aqui com o $ na frente do nome da variavel quando nao tiver nenhuma apenas deixe em branco)" +
                            " Exemplo usuario:" +
                            " tudo sim" +
                            " Exemplo chatbot:" +
                            " Que bom! Quer ajuda para escolher um bichinho? :)" +
                            " &cbm4p//" +
                            " Exemplo usuario:" +
                            " siim" +
                            " Ok! Então vamos nessa, primeiro de tudo qual o seu nome?" +
                            " &cbm4p//" +
                            " Exemplo usuario:" +
                            " Meu nome é (Nome)" +
                            " Exemplo chatbot:" +
                            " Opa! Tudo bem (Nome)? Pra facilitar na comunicação com você, pode me passar seu e-mail?" +
                            " &cbm4p//" +
                            " $userName (Nome);" +
                            " etc."
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Entendido! Estou pronto para ajudar!" +
                            " &cbm4p//"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            "vamos fazer uma rodada teste"
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Vamos! :)" +
                            " &cbm4p//"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            "bom dia"
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Bom dia! Tudo bem? Posso te ajudar a encotrar um amigo hoje?" +
                            " &cbm4p//"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " claro"
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Otimo! Pra começarmos bem, qual seu nome?" +
                            " &cbm4p//"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " meu nome é roberto figueiroa" +
                            " Faltam definir as seguintes variáveis: userName / userMail / userPostal / petType / petBreed / petAge / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Eai Roberto! Primeiro, vou pegar algumas informações de contato ok?" +
                            " Qual o seu email?" +
                            " &cbm4p//"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " robert@mail.com" +
                            " Faltam definir as seguintes variáveis: userMail / userPostal / petType / petBreed / petAge / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Entendi!" +
                            " Agora, vamos achar uma ONG proxima a você. Qual o seu CEP?" +
                            " &cbm4p//" +
                            " $userMail robert@mail.com;"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " meu cep é 00000-01" +
                            " Faltam definir as seguintes variáveis: userPostal / petType / petBreed / petAge / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Perfeito!" +
                            " Vou verificar no banco de dados as ONGs proximas a você. Enquanto isso, que tipo de animal você procura?" +
                            " &cbm4p//" +
                            " $userPostal 00000-01;"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " ah eu tava querendo um cachorrinho" +
                            " Faltam definir as seguintes variáveis: petType / petBreed / petAge / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Um au au!" +
                            " E que faixa etaria você estava pensando?" +
                            " &cbm4p//" +
                            " $petType Dog;"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " nao sei ainda, vou pensar" +
                            " Faltam definir as seguintes variáveis: / petBreed / petAge / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Ok, sem problema algum." +
                            " Você teria preferencia por alguma raça?" +
                            " &cbm4p//" +
                            " $petAge undefined;"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " nah" +
                            " Faltam definir as seguintes variáveis: / petBreed / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Boa! Tem sempre um caramelinho te esperando se for procurar bem." +
                            " E o gênero do $petType (cachorrinho) ja pensou sobre?" +
                            " &cbm4p//" +
                            " $petBreed none;"
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " queria uma fêmea" +
                            " Faltam definir as seguintes variáveis: / petGender "
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Muito bem! Vamos procurar sua amiguinha agora mesmo!" +
                            " &cbm4p//" +
                            " $petBreed petGender;"
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Verifiquei aqui e achei alguns resultados semelhantes ao que você procura." +
                            " Oque acha desses aqui?" +
                            " https://match4pets.com.br/$ongId/$petType/example1" +
                            " https://match4pets.com.br/$ongId/$petType/example2" +
                            " https://match4pets.com.br/$ongId/$petType/example3" +
                            " &cbm4p//",
                    }]
                },
                {
                    "role": "user", "parts": [{
                        text:
                            " Beleza agora vamos fazer pra valer!" +
                            " Comece a conversa de novo mas sem se lembrar da ultima que tivemos, como se fosse um novo usuario"
                    }]
                },
                {
                    "role": "model", "parts": [{
                        text:
                            " Ok, vamos nessa :)" +
                            " &cbm4p//",
                    }]
                },
            ]
        });

        //chatHistory = chat.params.history || [];

        return chat

    } catch (error) {
        console.error("Erro ao inicializar o chat:", error);
        return null;
    }
}

export async function getAIResponse(refChat, input) {
    try {
        if (!refChat) {
            console.error("Chat não foi inicializado.");
            return "Chat não foi inicializado.";
        }

        const historyResponse = await refChat.sendMessage(input);
        const textResponse = historyResponse.response.candidates[0].content.parts[0].text;

        return textResponse;
    } catch (error) {
        console.error("Erro ao obter resposta da IA:", error);
        console.log("userInput:", input);
        
        return "Desculpe, ocorreu um erro ao processar sua solicitação.";
    }
}

export function sendVariable(variable) {
    // Sua lógica para extrair as variáveis

    var varStr = variable.split("&cbm4p//").slice(1);

    const regex = /\$([a-zA-Z]+)\s+([^\$]+)/g; // regex d verificacao pra variaveis e valores
    let match;

    while ((match = regex.exec(varStr)) !== null) {
        const varName = match[1];  // nome da variável
        const varValue = match[2].trim();  // valor da variável
        listVariables[varName] = varValue;

        //console.log(listVariables);

        //verifyAllMet(listVariables);
    }

    return listVariables;
}

export function verifyAllMet(listedVariables) { // verificando o roteiro dinamico pro bot nao divagar muito
    // Atualizar as variáveis definidas no listVariables
    for (const [varName, varValue] of Object.entries(listedVariables)) {
        if (requiredVariables.hasOwnProperty(varName)) {
            requiredVariables[varName] = varValue; // atualiza a variavel ja existente com um valor
        }
    }

    // gerar o prompt dinamicamente com base noq falta
    requirePrompt = "&rvm4p// faltam definir as seguintes variáveis: "; // roteiro mandado discretamente pelo usuario
    let allDefined = true;

    for (const [varName, varValue] of Object.entries(requiredVariables)) { // gera o roteiro
        if (varValue === 'not defined') {
            requirePrompt += `/ ${varName} `;
            allDefined = false;
        }
    }

    // verifica se todas as variáveis foram definidas
    if (allDefined) {
        requirePrompt = "&rvm4p// todas as variáveis foram definidas!"; // confirmacao
    }

    //console.log(requirePrompt);
    return requirePrompt;
}
