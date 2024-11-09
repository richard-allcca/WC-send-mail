import { useState } from "react";
import { helperHttp } from "../services/helperHttp";

// REVIEW - Puedes probar usar un effect para ejecutar este evento, dependencia de form
// NOTE  - se puede usar el submit para disparar el evento de error

export const useForm = (initialForm, validateForm) => {
	const [ form, setForm ] = useState(initialForm);
	const [ errors, setErrors ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ response, setResponse ] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setForm({
			...form,
			[ name ]: value,
		});
	};

	/**
	 *...errors: Mantenemos los errores existentes tal como están.
	* [name]: Utilizamos el nombre del campo (por ejemplo, name, email, etc.) como clave en el objeto errors.
	* validateForm({ ...form, [name]: value })[name]: Aquí estamos llamando a la función validateForm, pero en lugar de validar todo el formulario,
	* solo validamos el campo específico que se ha desenfocado. Utilizamos el nombre del campo y su valor actual para crear un objeto de formulario parcial 
	* y llamamos a validateForm con ese objeto. Luego, obtenemos solo el error de ese campo específico.
	 * @param {*} e
	 */
	const handleBlur = (e) => {
		const { name, value } = e.target;
		setErrors({
			...errors,
			[ name ]: validateForm({ ...form, [ name ]: value })[ name ]
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(validateForm(form));

		if (Object.keys(errors).length === 0) {
			alert("Estas seguro de enviar este correo?");
			setLoading(true);
			helperHttp()
				.post("https://formsubmit.co/ajax/richard_allcca_llano@hotmail.com", {
					body: form,
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				})
				.then(() => {
					setLoading(false);
					setResponse(true);
					setForm(initialForm);
					setTimeout(() => setResponse(false), 3500);
				});
		} else {
			return;
		}
	};

	return {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleBlur,
		handleSubmit,
	};
};
