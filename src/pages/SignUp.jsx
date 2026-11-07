import { registerUser } from "../services/authService";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const user = await registerUser(email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="relative mr-[20%] h-screen w-[80%] px-3 py-3">
      <div className="flex flex-col gap-10">
        <div>
          <Input
            label={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label={"password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          text={"makeAcoutn"}
          className="w-70"
          onClick={() => handleSubmit()}
        />
      </div>
    </main>
  );
};
export default Signup;
