import { logIn, registerUser } from "../services/authService";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { useAuth } from "../store/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAuth((a) => a.user);
  const handleSubmit = async () => {
    try {
      await registerUser(email, password);
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
        {!user && (
          <div>
            <Button
              text={"signin"}
              className="w-70"
              onClick={() => handleSubmit()}
            />
            <Button
              text={"Login"}
              className="w-70"
              onClick={() => logIn(email, password)}
            />
          </div>
        )}
      </div>
    </main>
  );
};
export default Signup;
