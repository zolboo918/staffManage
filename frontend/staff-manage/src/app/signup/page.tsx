import RegisterForm from "src/components/RegisterForm";

function Signup() {
  return (
    <div className=" w-[60%] self-center justify-self-center bg-white border-2 shadow-xl rounded-2xl p-14">
      <span className="text-gray-900 text-4xl">Бүртгүүлэх</span>
      <RegisterForm />
    </div>
  );
}

export default Signup;
