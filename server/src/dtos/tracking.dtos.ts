import { HistoryI, TrackingI } from "../interfaces/Package.interfaces";

export function mapToTrackingDTO(tracking: TrackingI): TrackingI {
    const { currentLocation, currentStatus, history, lastUpdate } = tracking;
    return {
      currentLocation,
      currentStatus,
      lastUpdate,
      history: history.map(mapToHistoryDTO),
    };
  }
  
  function mapToHistoryDTO(history: HistoryI): HistoryI {
    const { location, status, timestamp } = history;
    return { location, status, timestamp };
  }
  