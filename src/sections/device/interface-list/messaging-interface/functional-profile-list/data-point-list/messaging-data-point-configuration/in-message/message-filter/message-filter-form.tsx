"use client";

import { FormSection } from "@/components/forms/form-section";
import { SelectField } from "@/components/forms/select-field";
import { InputField } from "@/components/forms/input-field";
import { MessageFilter } from "@/models/generic";
import { createFormOptions } from "@/models/form-options-helper";
import { MessageFilterSlice, MESSAGE_FILTER_TYPE_VALUES, MessageFilterType } from "./message-filter-slice";

const MESSAGE_FILTER_TYPE_OPTIONS = createFormOptions(MESSAGE_FILTER_TYPE_VALUES);

interface MessageFilterFormProps {
  messageFilter: MessageFilter | undefined;
  actions: MessageFilterSlice;
  fieldPathPrefix: string;
  getError: (fieldPath: string) => string | undefined;
}

export function MessageFilterForm({ messageFilter, actions, fieldPathPrefix, getError }: MessageFilterFormProps) {
  const filterType = messageFilter
    ? "plaintextFilter" in messageFilter
      ? "plaintextFilter"
      : "jmespathFilter" in messageFilter
        ? "jmespathFilter"
        : "xpathFilter" in messageFilter
          ? "xpathFilter"
          : "regexFilter" in messageFilter
            ? "regexFilter"
            : "jsonataFilter"
    : undefined;

  return (
    <FormSection
      title="Message Filter"
      description="Configure the message filter"
      required={false}
      isAdded={!!messageFilter}
      onAdd={() => actions.addMessageFilter("plaintextFilter")}
      onRemove={() => actions.removeMessageFilter()}
      nested={true}
    >
      {messageFilter && (
        <div className="space-y-4">
          <SelectField
            label="Filter Type"
            name={`${fieldPathPrefix}-filterType`}
            required={true}
            options={MESSAGE_FILTER_TYPE_OPTIONS}
            value={filterType || ""}
            onChange={(value) => {
              if (value && value !== filterType) {
                actions.changeMessageFilterType(value as MessageFilterType);
              }
            }}
            placeholder="Select filter type"
            error={getError(`${fieldPathPrefix}.filterType`)}
          />

          {messageFilter && "plaintextFilter" in messageFilter && (
            <InputField
              label="Matches Regex"
              name={`${fieldPathPrefix}-plaintextFilter-matchesRegex`}
              type="text"
              value={messageFilter.plaintextFilter.matchesRegex}
              onChange={(value) => actions.updatePlaintextFilterMatchesRegex(value)}
              placeholder="Enter regex pattern"
              required={true}
              error={getError(`${fieldPathPrefix}.plaintextFilter.matchesRegex`)}
            />
          )}

          {messageFilter && "jmespathFilter" in messageFilter && (
            <>
              <InputField
                label="Query"
                name={`${fieldPathPrefix}-jmespathFilter-query`}
                type="text"
                value={messageFilter.jmespathFilter.query}
                onChange={(value) => actions.updateJmespathFilterQuery(value)}
                placeholder="Enter JMESPath query"
                required={true}
                error={getError(`${fieldPathPrefix}.jmespathFilter.query`)}
              />
              <InputField
                label="Matches Regex"
                name={`${fieldPathPrefix}-jmespathFilter-matchesRegex`}
                type="text"
                value={messageFilter.jmespathFilter.matchesRegex}
                onChange={(value) => actions.updateJmespathFilterMatchesRegex(value)}
                placeholder="Enter regex pattern"
                required={true}
                error={getError(`${fieldPathPrefix}.jmespathFilter.matchesRegex`)}
              />
            </>
          )}

          {messageFilter && "xpathFilter" in messageFilter && (
            <>
              <InputField
                label="Query"
                name={`${fieldPathPrefix}-xpathFilter-query`}
                type="text"
                value={messageFilter.xpathFilter.query}
                onChange={(value) => actions.updateXpathFilterQuery(value)}
                placeholder="Enter XPath query"
                required={true}
                error={getError(`${fieldPathPrefix}.xpathFilter.query`)}
              />
              <InputField
                label="Matches Regex"
                name={`${fieldPathPrefix}-xpathFilter-matchesRegex`}
                type="text"
                value={messageFilter.xpathFilter.matchesRegex}
                onChange={(value) => actions.updateXpathFilterMatchesRegex(value)}
                placeholder="Enter regex pattern"
                required={true}
                error={getError(`${fieldPathPrefix}.xpathFilter.matchesRegex`)}
              />
            </>
          )}

          {messageFilter && "regexFilter" in messageFilter && (
            <>
              <InputField
                label="Query"
                name={`${fieldPathPrefix}-regexFilter-query`}
                type="text"
                value={messageFilter.regexFilter.query}
                onChange={(value) => actions.updateRegexFilterQuery(value)}
                placeholder="Enter regex query"
                required={true}
                error={getError(`${fieldPathPrefix}.regexFilter.query`)}
              />
              <InputField
                label="Matches Regex"
                name={`${fieldPathPrefix}-regexFilter-matchesRegex`}
                type="text"
                value={messageFilter.regexFilter.matchesRegex}
                onChange={(value) => actions.updateRegexFilterMatchesRegex(value)}
                placeholder="Enter regex pattern"
                required={true}
                error={getError(`${fieldPathPrefix}.regexFilter.matchesRegex`)}
              />
            </>
          )}

          {messageFilter && "jsonataFilter" in messageFilter && (
            <>
              <InputField
                label="Query"
                name={`${fieldPathPrefix}-jsonataFilter-query`}
                type="text"
                value={messageFilter.jsonataFilter.query}
                onChange={(value) => actions.updateJSONataFilterQuery(value)}
                placeholder="Enter JSONata query"
                required={true}
                error={getError(`${fieldPathPrefix}.jsonataFilter.query`)}
              />
              <InputField
                label="Matches Regex"
                name={`${fieldPathPrefix}-jsonataFilter-matchesRegex`}
                type="text"
                value={messageFilter.jsonataFilter.matchesRegex}
                onChange={(value) => actions.updateJSONataFilterMatchesRegex(value)}
                placeholder="Enter regex pattern"
                required={true}
                error={getError(`${fieldPathPrefix}.jsonataFilter.matchesRegex`)}
              />
            </>
          )}
        </div>
      )}
    </FormSection>
  );
}
