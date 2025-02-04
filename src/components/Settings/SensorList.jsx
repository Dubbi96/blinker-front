import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../Title";
import { grey } from "@mui/material/colors";
import { dummySignalLights } from "../../pages/Monitoring/dummy";
import { TableHeaderStyle, TableRowStyle } from "../Sensors/SensorList";

const SensorList = () => {
  return (
    <Stack
      sx={{
        borderRight: `1px solid ${grey[200]}`,
      }}
    >
      <Title title="센서 목록" />
      <Stack
        sx={{
          padding: "10px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={TableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>위치</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummySignalLights.map((item) => {
              return (
                <TableRow sx={TableRowStyle} key={item.sensorId}>
                  {/* TODO: Id 수정 필요 */}
                  <TableCell>00000741702c1ffffe54c0c3</TableCell>
                  <TableCell>{item.address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default SensorList;
