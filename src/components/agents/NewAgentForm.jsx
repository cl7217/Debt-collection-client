// src/components/agents/AgentTable.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAgents } from "../../redux/agentsSlice";

import AgentModal from "./AgentModal";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Box
} from "@mui/material";

export default function AgentTable() {
  const dispatch = useDispatch();

  const agents = useSelector((state) => state.agents.list);
  
  const loading = useSelector((state) => state.agents.loading);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const getActiveStyle = (active) =>
    active
      ? { bg: "#4caf50", color: "#fff" }
      : { bg: "#d32f2f", color: "#fff" };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 900, margin: "auto", direction: "rtl" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>מספר סוכן</TableCell>
              <TableCell sx={{ textAlign: "center" }}>שם</TableCell>
              <TableCell sx={{ textAlign: "center" }}>טלפון</TableCell>
              <TableCell sx={{ textAlign: "center" }}>אימייל</TableCell>
              <TableCell sx={{ textAlign: "center" }}>סטטוס</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {agents?.map((agent) => {
              const style = getActiveStyle(agent.isActive);

              return (
                <TableRow
                  key={agent.id}
                  hover
                  onClick={() => setSelected(agent)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell sx={{ textAlign: "center" }}>{agent.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{agent.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{agent.phone}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{agent.email}</TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <Chip
                      label={agent.isActive ? "פעיל" : "לא פעיל"}
                      size="small"
                      sx={{
                        backgroundColor: style.bg,
                        color: style.color,
                        fontWeight: "bold"
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selected && (
        <AgentModal agent={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
