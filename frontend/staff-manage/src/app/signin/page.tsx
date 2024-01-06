import ApolloProvider from "src/components/ApolloProvider";
import LoginForm from "src/components/LoginForm";

function Signin() {
  return (
    <div className="w-[60%] self-center justify-self-center bg-white border-2 shadow-xl rounded-2xl p-14">
      <span className="text-gray-900 text-4xl">Нэвтрэх</span>
      <LoginForm />
    </div>
  );
}

export default Signin;
