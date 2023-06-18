import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./init";

export function loginToCMS(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			return { status: true, message: "登入成功" };
		})
		.catch((error) => {
			return { status: false, message: error.message };
		});
}
