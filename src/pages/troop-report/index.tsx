import { Box } from '@mui/material';
import * as styles from './index.styles'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const TroopReport: React.FC = () => {
  return (
    <Box sx={styles.containerStyle}>
      <Box sx={styles.dateSelectPanelStyle}>
        <label>Ngày</label>
        <DatePicker format='DD/MM/YYYY' />
      </Box>
      <Box sx={styles.contentPanelStyle}>
        <Box sx={styles.childStatusPanelStyle}>
          <Box sx={styles.titleStyle}>Tình hình quân số các đơn vị</Box>
        </Box>
        <Box sx={styles.currentUnitReportPanelStyle}>
        <Box sx={styles.titleStyle}>Cập nhật quân số trực tiếp</Box>
        </Box>
      </Box>
    </Box>
  )
};
