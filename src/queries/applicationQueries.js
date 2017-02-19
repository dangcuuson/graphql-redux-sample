import gql from 'graphql-tag';

export const getApplicationQuery = gql`
    query getSingleApplication($reference_id: String!)
      {
        application(reference_id: $reference_id){
          reference_id,
          
          ...SmartAlarms
          
          ...on HillsConsumerApplication{
            applicant_1_first_name,
            applicant_1_last_name
          }
        }
      }

      fragment SmartAlarms on SmartAlarmsApplication{
        contact_info{
          contact_full_name,
          contact_mobile,
          contact_email,
          contact_address,
        }
        Application_Form_Option,
        
        service_detail{
          Hardware_Installed_New_Alarm_Amount,
          Hardware_Installed_Upgrade_IGM_Amount,
          Hardware_Installed_Installation_Charge_Amount,
          Hardware_Installed_Activation_Charge_Amount,
          Hardware_Installed_Extra{
            Amount,
            Description
          }
          Hardware_Installed_Total_Amount


          Recurring_Alarm_Amount,
          Recurring_Maintenance_Amount,
          Recurring_Enviromental_Amount,
          Recurring_Extra{
            Amount,
            Description
          }
          Recurring_Total

          Total_Amount_Payable
        }
        
        Applicant_Housing_Status{
          Applicant_Years_At_Address
          Applicant_Months_At_Address
        }
      }
`