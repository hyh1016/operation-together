package com.yhproject.operation_together.domain.operation;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import com.yhproject.operation_together.domain.input.Input;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Operation extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    public String password;

    public String link;

    public LocalDateTime operationDay;

    public int type;

    @OneToMany(mappedBy = "operation")
    public List<Input> inputs;

    @Builder
    public Operation(String name, String password, String link, LocalDateTime operationDay, int type) {
        this.name = name;
        this.password = password;
        this.link = link;
        this.operationDay = operationDay;
        this.type = type;
    }
}
