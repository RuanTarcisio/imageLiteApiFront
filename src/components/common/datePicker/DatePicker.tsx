import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale/pt-BR'; // Importação correta do locale

registerLocale('pt-BR', ptBR);

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  allowFutureDates?: boolean;
}

export const CustomDatePicker = ({ selected, onChange, allowFutureDates = false }: DatePickerProps) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      placeholderText="Selecione a data"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      showYearDropdown
      yearDropdownItemNumber={100}
      scrollableYearDropdown
      maxDate={allowFutureDates ? undefined : new Date()}
      strictParsing // Impede a exibição de dias de outros meses
      showMonthDropdown // Mostra o dropdown de mês
      dropdownMode="select" // Modo de seleção para os dropdowns
      locale="pt-BR" // Configura o locale para português
      popperClassName="!bg-white dark:!bg-gray-800 !border !border-gray-300 dark:!border-gray-700 !rounded-lg !shadow-lg" // Estilo do popover
      monthClassName={() => 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'} // Estilo do dropdown de meses
      yearClassName={() => 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'} // Estilo do dropdown de anos
    />
  );
};