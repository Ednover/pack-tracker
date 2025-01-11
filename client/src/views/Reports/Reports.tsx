import { useEffect, useState } from "react";
import Input from "../../componets/Input/Input";
import Layout from "../../componets/Layout/Layout";
import { getCookieToken } from "../../services/cookies/cookies";
import { ReportsInfoI } from "../../interfaces/PackageI";
import ListPackages from "../../componets/ListPackages/ListPackages";
import ReportCard from "../../componets/ReportCard/ReportCard";
import { packageStatus } from "../../utils/packageStatus";

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateReport, setDateReport] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [reportInfo, setReportInfo] = useState<ReportsInfoI>();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/admin/reports/${dateReport}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookieToken()}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setReportInfo(result);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [dateReport]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDateReport(value);
    setIsLoading(true);
  };

  return (
    <Layout>
      <h1 className="text-2xl">Generar reportes de paquetes</h1>
      <div className="">
        <Input
          name="dateReport"
          onChange={handleChange}
          title="Fecha de reporte"
          value={dateReport}
          type="date"
        />
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : !reportInfo ? (
        <p>No hay reportes para la fecha seleccionada</p>
      ) : (
        <div className="max-w-4xl sm:w-full mx-3">
          <div className="grid grid-cols-3">
            <ReportCard
              quantity={reportInfo.listPackages.length}
              title="Totales"
            />
            <ReportCard quantity={reportInfo.packagesCreated} title="Creados" />
            <ReportCard
              quantity={reportInfo.preparationPackages.length}
              title={packageStatus.inPreparation}
            />
            <ReportCard
              quantity={reportInfo.progressPackages.length}
              title={packageStatus.inProgress}
            />
            <ReportCard
              quantity={reportInfo.deliveryPackages.length}
              title={packageStatus.delivery}
            />
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {reportInfo.preparationPackages.length ? (
              <div className="flex flex-col gap-3">
                <p className="text-xl">{packageStatus.inPreparation}</p>
                <ListPackages packages={reportInfo.preparationPackages} />
              </div>
            ) : (
              <></>
            )}
            {reportInfo.progressPackages.length ? (
              <div className="flex flex-col gap-3">
                <p className="text-xl">{packageStatus.inProgress}</p>
                <ListPackages packages={reportInfo.progressPackages} />
              </div>
            ) : (
              <></>
            )}
            {reportInfo.deliveryPackages.length ? (
              <div className="flex flex-col gap-3">
                <p className="text-xl">{packageStatus.delivery}</p>
                <ListPackages packages={reportInfo.deliveryPackages} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Reports;
