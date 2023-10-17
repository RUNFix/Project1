// Define una interfaz para la nueva propiedad en el objeto window
/* interface MyWindow extends Window {
  watsonAssistantChatOptions?: {
    integrationID: string;
    region: string;
    serviceInstanceID: string;
    onLoad: (instance: string) => void;
    clientVersion?: string;
  };
} */

// Declara que el objeto window tiene la nueva propiedad
//declare let window: MyWindow;

const Watson: React.FC = () => {
  /* useEffect(() => {
    // Asigna el nuevo objeto a la propiedad watsonAssistantChatOptions
    window.watsonAssistantChatOptions = {
      integrationID: 'f91c3b0a-c023-45fe-a669-53f201c9b04f',
      region: 'us-south',
      serviceInstanceID: 'fa0419a2-4a5d-4fd0-8c08-9932366019f6',
      onLoad: function (instance) {
        console.log("w")
      },
    };

    // Agrega el script a la página
    const script = document.createElement('script');
    script.src = `https://web-chat.global.assistant.watson.appdomain.cloud/versions/${
      window.watsonAssistantChatOptions?.clientVersion || 'latest'
    }/WatsonAssistantChatEntry.js`;
    document.head.appendChild(script);
  }, []);
 */
  return <div />;
};

export default Watson;
