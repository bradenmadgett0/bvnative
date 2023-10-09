import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';

const HeaderBarContainer = styled.View({
  padding: 16,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

const ActionContainer = styled.TouchableOpacity({
  flexDirection: 'row',
  position: 'absolute',
  right: 24,
});

const ActionLabel = styled.Text({
  fontWeight: 'bold',
});

const GoBack = styled.TouchableOpacity({
  position: 'absolute',
  left: 24,
});

const Title = styled.Text({
  fontWeight: 'bold',
  fontSize: 18,
});

interface HeaderBarProps {
  title: string;
  action?: () => void;
  actionLabel?: string;
  withBack?: boolean;
}

const HeaderBar = ({
  title,
  action,
  actionLabel,
  withBack,
}: HeaderBarProps): JSX.Element => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <HeaderBarContainer>
        {withBack ? (
          <GoBack onPress={() => navigation.goBack()}>
            <Text>Go back</Text>
          </GoBack>
        ) : null}
        <Title>{title}</Title>
        {action && actionLabel ? (
          <ActionContainer onPress={() => action?.()}>
            <ActionLabel>{actionLabel}</ActionLabel>
          </ActionContainer>
        ) : null}
      </HeaderBarContainer>
    </SafeAreaView>
  );
};

export default HeaderBar;
