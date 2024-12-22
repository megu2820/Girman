import * as Dialog from "@radix-ui/react-dialog";
import { RxCross1 } from "react-icons/rx";

const UserCard = ({ selectedItem, closeModal }) => {
  const handleClose = () => closeModal();

  return (
    <Dialog.Root open={Boolean(selectedItem)} onOpenChange={handleClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <Dialog.Content className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Dialog.Title className="text-2xl font-bold mb-4">
          Fetch Details
        </Dialog.Title>
        <Dialog.Description className="text-gray-600 mb-4">
          Here are the details of the selected employee.
        </Dialog.Description>

        <div className="mb-4">
          <p>
            <strong>Name:</strong>{" "}
            {`${selectedItem.first_name} ${selectedItem.last_name}`}
          </p>
          <p>
            <strong>Location:</strong> {selectedItem.city}
          </p>
          <p>
            <strong>Contact Number:</strong> {selectedItem.contact_number}
          </p>
        </div>

        <div className="mb-4">
          <strong>Profile Image:</strong>
          <div className="w-28 h-28 overflow-hidden rounded-full mt-2">
            <img
              src="https://i.ibb.co/wyNf9q6/coder.webp"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Dialog.Close
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={handleClose}
        >
          <RxCross1 />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserCard;
