import AuthForm from "../../features/auth/ui/AuthForm/AuthForm";

function SignUpPage({ setUser }) {
  console.log(123);
  return (
    <>
      <AuthForm type="signup" setUser={setUser} />
    </>
  );
}

export default SignUpPage;
