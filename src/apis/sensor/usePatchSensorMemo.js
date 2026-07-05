import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

const patchSensorMemo = async ({ sensorId, appUserId, memo }) => {
  const response = await axiosInstance.patch(
    `/sensor/${sensorId}/memo?appUserId=${appUserId}`,
    {
      memo,
    }
  );
  return response.data;
};

export const usePatchSensorMemo = (sensorId, appUserId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchSensorMemo,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "sensor",
          "detail",
          variables?.sensorId ?? sensorId,
          variables?.appUserId ?? appUserId,
        ],
      });
    },
  });
};
