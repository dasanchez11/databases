import React from "react";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../components/Modal/Modal.component";
import Pagination from "../components/Pagination/Pagination.component";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllTrucksFirebase } from "../Firebase/firebase.trucks";
import TrucksRow from "../components/TrucksRow/TrucksRow.component";
import EditTruck from "../components/EditTruck/EditTruck.component";

const Truck = () => {
  const authContext = useContext(AuthContext);
  const [trucks, setTrucks] = useState([]);
  const [editTrucks, setEditTrucks] = useState("");
  const { setLoading } = authContext;

  // Pagination
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [count, setCount] = useState();
  const [itemsPerPage, setItemsPerPage] = useState();
  const [editTruckOpen, setEditTruckOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await getAllTrucksFirebase();
        setPageCount(1);
        setItemsPerPage(10);
        setTrucks(result);
        setCount(12);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, [page, setLoading]);

  const handleNewtrackClick = () => {
    setEditTruckOpen(true);
    setEditTrucks("");
  };

  return (
    <div className="h-[87vh] w-[80vw] overflow-x-scroll max-h-[87vh]">
      <div
        onClick={handleNewtrackClick}
        className="text-xl text-blue-900 text-center flex flex-row items-center gap-2 cursor-pointer w-fit p-2 hover:bg-blue-500 hover:text-white rounded-sm"
      >
        <h1>Add a New Truck</h1>
        <AiOutlinePlus />
      </div>
      {editTruckOpen && (
        <Modal open={editTruckOpen} onClose={() => setEditTruckOpen(false)}>
          <EditTruck
            setTrucks={setTrucks}
            truckToEdit={editTrucks}
            onClose={() => {
              setEditTruckOpen(false);
              setEditTrucks("");
            }}
          />
        </Modal>
      )}
      {trucks.length === 0 ? (
        <div className="text-center">No Trucks to Display</div>
      ) : (
        <>
          <table className="w-[110%] table-auto font-thin border-blue-900 text-left m-3 ">
            <thead>
              <tr className="text-xs font-bold w-auto">
                <td className="w-auto px-2 text-left border border-blue-900 min-w-fit">
                  Truck ID
                </td>
                <td className="w-auto px-2 text-left border border-blue-900 min-w-fit">
                  Status
                </td>
                <td className="w-auto px-2 text-left border border-blue-900 min-w-fit">
                  Capacity
                </td>
                <td className="w-auto px-2 text-left border border-blue-900 min-w-fit">
                  Model
                </td>
                <td className="w-auto px-2 text-left border border-blue-900 min-w-fit">
                  Brand
                </td>
                <td className="w-auto px-2 text-left border border-blue-900 min-w-fit">
                  Year
                </td>
              </tr>
            </thead>
            <tbody>
              {trucks.map((item) => {
                return (
                  <TrucksRow
                    key={item._id}
                    item={item}
                    setTrucks={setTrucks}
                    setEditModalOpen={setEditTruckOpen}
                    setEditTruck={setEditTrucks}
                  />
                );
              })}
            </tbody>
          </table>
          <Pagination
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            count={count}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default Truck;
