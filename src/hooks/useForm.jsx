import { useState } from "react";
import { helperHttp } from "../services/helperHttp";

// REVIEW - Puedes probar usar un effect para ejecutar este evento, dependencia de form
// NOTE  - se puede usar el submit para disparar el evento de error

export const useForm = (initialForm, validateForm) => {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleBlur = (e) => {
		e.preventDefault();
		setErrors(validateForm(form));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleBlur()
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
