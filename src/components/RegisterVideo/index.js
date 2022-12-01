import { StyledRegisterVideo } from "./styles"
import React from "react";

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues);


    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {setValues({})},
        catchImage(url) {
            const videoSlice = "=";
            if(url.includes(videoSlice)){
                const start = url.indexOf(videoSlice) + 1;
                const urlVideo = url.slice(start);
                const urlThumb = 'https://img.youtube.com/vi/' + urlVideo + '/hqdefault.jpg';
                console.log(urlThumb);
                
                return urlThumb
            }
        }
    };
}


export default function RegisterVideo() {
    const [formVisible, setFormVisible] = React.useState(false);
    const formCadastro = useForm({
        initialValues: {titulo: "Julian é uma gatinha", url: "chamaNoZap"}
    });

    return (
        <StyledRegisterVideo>
            <button type="button" className="add-video" onClick={() => setFormVisible(true)}>
                +
            </button>
            {formVisible && 
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    setFormVisible(false);
                    formCadastro.clearForm();
                    formCadastro.catchImage(formCadastro.values.url);
                }} >
                    <div>
                        <button className="close-modal" onClick={() => setFormVisible(false)}>
                            X
                        </button>
                        <input
                            placeholder="Título do Video"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange} />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange} />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            }
        </StyledRegisterVideo>
    )
}