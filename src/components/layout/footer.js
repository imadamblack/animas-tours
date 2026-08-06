import { info } from "../../../info";

export default function Footer() {
  return (
    <footer className="relative mb-0  border-t">
      <div className="bg-gray-200 py-6">
        <div className="container py-8 justify-between">
          <div className="flex flex-row gap-3 items-center">
            <p className="text-center ft-0 m-0">
              {info.companyName} ©{" "}
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
