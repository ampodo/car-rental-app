import {
  Button,
  Card,
  Input,
  Checkbox,
  Typography,
} from "./MaterialTailwindComponents";

function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false} className="-mt-10">
        <div className="text-center">
          <img
            src="./car-sign-up.jpg"
            alt="Registration-image"
            className="rounded-full object-cover w-36 h-36 mx-auto mb-2"
          />
          <Typography variant="h3" color="blue-gray">
            Sign Up
          </Typography>
          <Typography variant="h6" color="gray" className="mt-2 font-normal">
            Please register to start renting cars with us
          </Typography>
        </div>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>

          <Button className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Register;
