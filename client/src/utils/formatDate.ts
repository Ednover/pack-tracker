export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone,
    };
  
    return new Intl.DateTimeFormat('es-MX', { ...defaultOptions }).format(date);
  };