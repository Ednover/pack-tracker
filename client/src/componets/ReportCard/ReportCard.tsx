
interface ReportCardProps {
    title: string;
    quantity: number;
  }
  
  const ReportCard: React.FC<ReportCardProps> = ({ quantity, title }) => {
    return (
      <div className="Flex flex-col border border-white p-2 text-center justify-center items-center">
        <p className="text-gray-300">{title}</p>
        <p className="text-xl font-bold">{quantity}</p>
      </div>
    );
  };

export default ReportCard