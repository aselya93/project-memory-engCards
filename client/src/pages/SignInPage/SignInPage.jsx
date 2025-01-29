import AuthForm from "../../features/auth/ui/AuthForm/AuthForm";

function SignInPage({ setUser }) {
  return <AuthForm type="signin" setUser={setUser} />;
}

export default SignInPage;
